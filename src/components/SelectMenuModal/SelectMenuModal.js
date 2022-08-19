import cross from "images/svg/cross.svg";
import check from "images/svg/check.svg";
import Image from "next/image";
import {
  RadioButton,
  SelectMenuModalWrapper,
  Menu,
  MenuHeader,
  MenuList,
} from "./styled";

const Item = ({ item, defaultValue }) => {
  return (
    <label className="item">
      <RadioButton
        value={item}
        defaultChecked={defaultValue === item}
        name="select"
        type="radio"
        hidden="hidden"
      />
      <div className="icon">
        <Image src={check} alt="" width="16" height="16" />
      </div>
      <span className="itemText">{item}</span>
    </label>
  );
};

const lists = {
  type: ["all", "public", "private", "forks", "sources", "member", "internal"],
  sort: ["created", "updated", "pushed", "full_name"],
  direction: ["desc", "asc"],
};

export default function SelectMenuModal({
  search,
  filterItem,
  closeModal,
  updateFilterValue,
}) {
  return (
    <SelectMenuModalWrapper onClick={closeModal}>
      <Menu
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MenuHeader>
          <span className="title">Select {filterItem}</span>
          <button className="btn" onClick={closeModal}>
            <Image className="img" src={cross} alt="" width="16" height="16" />
          </button>
        </MenuHeader>
        <MenuList
          onChange={(e) => {
            updateFilterValue(e.target.value);
            closeModal();
          }}
        >
          {lists[filterItem].map((i) => {
            return <Item key={i} item={i} defaultValue={search[filterItem]} />;
          })}
        </MenuList>
      </Menu>
    </SelectMenuModalWrapper>
  );
}
