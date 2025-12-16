import React, { useEffect } from "react";
import MapLeaflet from "../../components/MapLeaflet";
import styles from "./styles.module.css";
import Multiselect from "../../components/Multiselect";
//redux
import type { AppDispatch } from "../../redux/store";
import { fetchUsers } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <section className={styles.main_container}>
      <header className={styles.header}>
        <div className={styles.select_container}>
          <Multiselect />
        </div>
      </header>
      <MapLeaflet />
    </section>
  );
};

export default Home;
