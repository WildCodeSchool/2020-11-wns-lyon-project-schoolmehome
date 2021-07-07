import styled from "styled-components";
import { colors } from "../../colors";

export const ButtonDouble = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4%;
`;

const Button = styled.div`
    border : 1px solid ${colors.dark};
    padding : 15px;
    cursor: pointer;
    font-weight: bold;
    &.active {
        background-color: ${colors.light};
        color: ${colors.mediumlight};
    }
`;

export const ButtonLeft = styled(Button)`
    border-radius : 10px 0 0 10px;
`;

export const ButtonRight = styled(Button)`
    border-radius : 0 10px 10px 0;
`;