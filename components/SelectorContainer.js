import { useRef, memo, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import down from "@/svg/down.svg";
import SelectMenuModal from "./SelectMenuModal";

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

  return (
    <>
      <Container>
        {showModal && (
          <SelectMenuModal
            search={search}
            filterItem={filterItem}
            closeModal={closeModal}
            updateFilterValue={updateFilterValue}
          />
        )}
        <Selector onClick={() => handleSelector("type")}>
          <span className="text">Type</span>
          <Image src={down} alt="" width="10" height="10" />
        </Selector>
        <Selector onClick={() => handleSelector("sort")}>
          <span className="text">Sort</span>
          <Image src={down} alt="" width="10" height="10" />
        </Selector>
        <Selector onClick={() => handleSelector("direction")}>
          <span className="text">Direction</span>
          <Image src={down} alt="" width="10" height="10" />
        </Selector>
      </Container>
    </>
  );
};
export default SelectorContainer;
