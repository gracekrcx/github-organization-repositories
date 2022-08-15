import { useRef } from "react";
import { StoreContextConsumer } from "../context/store";
import Spinner from "../commonComponents/Spinner";

export default function Repositories({ handlePlusOne }) {
  // const ref = useRef(0);
  // console.log(ref.current++);
  const loading = false;
  return (
    <StoreContextConsumer>
      {({ repositories }) => {
        {
          /* console.log("> List", repositories); */
        }
        return (
          <>
            <h1>Repositories</h1>
            <button onClick={handlePlusOne}>click</button>
            {loading && <Spinner />}
          </>
        );
      }}
    </StoreContextConsumer>
  );
}
