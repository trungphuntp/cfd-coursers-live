import Button from "@/components/Button";
import { decrement, increment } from "@/store/actions/CounterActions";
import { fetchDog } from "@/store/actions/DogActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const ReduxStyles = styled.div`
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ReduxPage = () => {
    const counter = useSelector((state) => state?.CounterReducer);
    const dog = useSelector((state) => state?.DogReducer);
    const dispatch = useDispatch();
    console.log(dog);

    useEffect(() => {
        dispatch(fetchDog());
    }, []);

    return (
        <ReduxStyles>
            <h1>Counter: {counter}</h1>
            <div style={{ display: "flex", gap: "10px" }}>
                <Button
                    onClick={() => {
                        dispatch(decrement(5));
                    }}
                >
                    Decrement
                </Button>
                <Button
                    onClick={() => {
                        dispatch(increment(10));
                    }}
                >
                    Increment
                </Button>
            </div>
            <br />
            <br />

            <div>
                <img src={dog?.message || ""} alt="" style={{ height: "200px", width: "200px" }} />
                <Button
                    onClick={() => {
                        dispatch(fetchDog());
                    }}
                >
                    get dog
                </Button>
            </div>
        </ReduxStyles>
    );
};
export default ReduxPage;
