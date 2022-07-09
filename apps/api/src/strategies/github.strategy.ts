import { Strategy as GitHubStrategy } from "passport-github2";
import argon2 from "argon2";

import Strategy from "../types/strategy";
import { prisma } from "../db/client";

export class GithubOAuthStrategy extends Strategy {
  constructor() {
    super(
      "github",
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_ID!,
          clientSecret: process.env.GITHUB_SECRET!,
          callbackURL: "/auth/github/callback",
          scope: ["user"],
        },
        async (_: any, __: any, profile: any, done: any) => {
          const email = profile.emails[0].value;
          let user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            user = await prisma.user.create({
              data: {
                email,
                firstName: profile.name.displayName.split(" ")[0],
                lastName: profile.name.displayName.split(" ")[1],
              },
            });
          }
          const account = await prisma.account.findFirst({
            where: { providerName: "github", userId: user.id },
          });
          if (!account) {
            await prisma.account.create({
              data: {
                userId: user.id,
                providerName: "github",
                providerAccountId: profile.id,
              },
            });
          }

          return done(null, user);
        }
      )
    );
  }
}
