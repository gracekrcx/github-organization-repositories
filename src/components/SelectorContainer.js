import { useState, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import down from "images/svg/down.svg";
import SelectMenuModal from "./SelectMenuModal";
import useClickOutside from "hooks/useClickOutside";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  position: relative;
`;

const Selector = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 18px;
  background-color: #e9ecf0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  user-select: none;
  border: 1px solid #cbcbcb;
  border-radius: 6px;
  appearance: none;

  .text {
    margin-right: 7px;
  }
`;

const SelectorItem = ({ item, handleSelector }) => {
  const param = item.toLowerCase();
  return (
    <Selector onClick={() => handleSelector(param)}>
      <span className="text">{item}</span>
      <Image src={down} alt="" width="10" height="10" />
    </Selector>
  );
};

const SelectorContainer = ({ search, filterUpdateSearch }) => {
  const [showModal, setShowModal] = useState(false);
  const [filterItem, setFilterItem] = useState("");

  const handleSelector = (val) => {
    setShowModal(true);
    setFilterItem(val);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateFilterValue = (val) => {
    filterUpdateSearch({ [filterItem]: val });
  };

  const clickOutsideCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  let domNode = useClickOutside(clickOutsideCloseModal);

  return (
    <Container ref={domNode}>
      {showModal && (
        <SelectMenuModal
          search={search}
          filterItem={filterItem}
          closeModal={closeModal}
          updateFilterValue={updateFilterValue}
        />
      )}
      {["Type", "Sort", "Direction"].map((item) => {
        return (
          <SelectorItem
            key={item}
            item={item}
            handleSelector={handleSelector}
          />
        );
      })}
    </Container>
  );
};
export default SelectorContainer;
