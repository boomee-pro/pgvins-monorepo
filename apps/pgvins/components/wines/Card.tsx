import Image from "next/image";
import styles from "styles/card.module.scss";

// ICONS
import { BiShow, BiLoaderCircle } from "react-icons/bi";

const Card = () => {
  const wine = {
    id: 0,
    name: "Montrachet Grand Cru",
    price: 4205,
    origin: "France",
    domain: "Domaine Leflaive",
    img: "/images/wines/grand-cru.png",
    flag: "/images/flags/FR.svg",
  };

  return (
    <div className={styles.card}>
      <div className={styles.pictures}>
        <div className={styles.wine}>
          <Image
            src={wine.img}
            alt="Wine"
            layout="responsive"
            width="100%"
            height="100%"
          />
        </div>

        {/* <div className={styles.flag}>
          <Image src={wine.flag} alt="Flag" layout="fill" />
        </div> */}

        {/* <img className={styles.wine__flag} src={wine.flag} alt="" /> */}
      </div>

      <h2>{wine.domain}</h2>
      <p>{wine.name}</p>
      <h3>{wine.price} €</h3>

      <div className={styles.card__buttons}>
        <button>Ajouter</button>
        <a href={`/wines/${wine.id}`}>
          <BiShow size={24} />
        </a>
      </div>
    </div>
  );
};

export default Card;
