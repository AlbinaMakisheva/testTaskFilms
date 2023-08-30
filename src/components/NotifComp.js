import React from "react";
import { Modal } from "semantic-ui-react";

function NotifComp({ message, changeOpen, open, button, size, header }) {
  return (
    <>
      <Modal
        onClose={() => changeOpen(false)}
        onOpen={() => changeOpen(true)}
        open={open}
        size={size}
        aria-labelledby="notif-modal-header"
        closeIcon
        closeOnDimmerClick={false}
      >
        <Modal.Header id="notif-modal-header">{header}</Modal.Header>
        <Modal.Content>{message}</Modal.Content>
        <Modal.Actions>{button}</Modal.Actions>
      </Modal>
    </>
  );
}

export default NotifComp;
