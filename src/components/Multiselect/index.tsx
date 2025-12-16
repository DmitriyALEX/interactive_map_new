import Select from "react-select";
import type { MultiValue } from "react-select";
import useUniqTags from "../../hooks/useUniqTags";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { setSelectedTags } from "../../redux/usersSlice";

interface IMultiselectTags {
  value: string;
  label: string;
}

const Multiselect = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedTags = useSelector((state: RootState) => state.users.selectedTags);

  const uniqTags = useUniqTags();

  const options: IMultiselectTags[] = uniqTags.map((tag) => {
    const labelName = tag[0].toUpperCase() + tag.slice(1);

    return { value: tag, label: labelName };
  });

  const handleChange = (selectedOptions: MultiValue<IMultiselectTags>) => {
    const tags = selectedOptions.map((o) => o.value);

    dispatch(setSelectedTags(tags));
  };

  const value = options.filter((o) => selectedTags.includes(o.value));

  return (
    <section className={styles.select_container}>
      <Select options={options} value={value} onChange={handleChange} isMulti={true} />
    </section>
  );
};

export default Multiselect;
