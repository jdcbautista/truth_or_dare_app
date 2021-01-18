import { Flex, Link, Text, Box} from "rebass/styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled, { keyframes, css } from "styled-components";

export const GameName = styled.div`
$font:  sans-serif;
::selection { background-color: #C3CFE2; }

body {
  width: 100%;
	height: 100vh;
  display: flex;
	align-items: flex;
	justify-content: flex;
	background: linear-gradient(to right, #FDFBFB, #EBEDEE 70%);
}

.text {
	text-transform: lowercase;
	background: linear-gradient(to right, #30CFD0 0%, #330867 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font: {
		size: 8vw;
		$font: sans-serif;
	};
}
`;

