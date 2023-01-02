import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks';
import { IAlert } from '../const';
import SVG from 'react-inlinesvg';
import CloseIcon from '../img/icon-close.svg';

const StyledAlert = styled.div<{
  show: boolean,
  type: 'success' | 'error' | ''
}>`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10;

  width: 350px;
  padding: 15px;
  padding-right: 35px;

  color: #ffffff;

  background-color: ${({ type }) => {
    switch (type) {
      case 'success':
        return '#29a829';
      case 'error':
        return '#d32f2f';
      default:
        return '#0288d1';
    }
  }};
  border-radius: 5px;

  opacity: ${({ show }) => show ? 1 : 0};
  visibility: ${({ show }) => show ? 'visible' : 'hidden'};
  transition: visibility 0.3s linear, opacity 0.3s linear;

  svg {
    stroke: #ffffff;
  }
`;

const Text = styled.p`
  margin: 0;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;

  margin: 0;
  padding: 0;

  font-size: 0;

  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default function Alert () {
  const { alerts } = useAppSelector((state) => state.alerts);

  const [alert, setAlert] = useState<IAlert>({
    message: '',
    type: ''
  });
  const [show, setShow] = useState(false);

  const CloseBtnClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(false);
  }

  useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [alerts]);

  return (
    <StyledAlert show={show} type={alert.type}>
      <Text>{alert.message}</Text>
      
      <CloseBtn type='button' onClick={CloseBtnClickHandler}>
        Закрыть уведомление
        <SVG src={CloseIcon} width={20} height={20} />
      </CloseBtn>
    </StyledAlert>
  );
};