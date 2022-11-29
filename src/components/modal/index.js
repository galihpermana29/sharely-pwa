import { Modal } from 'antd';

import './style.scss';

/**
 *
 * @param {Object} props
 * @param {VoidFunction} props.handleClose function to hide modal, default () => {}
 * @param {Boolean} props.visible boolean value that define whether visible or not, default false
 * @param {Boolean} props.closable boolean value that define whether closable or not, default true
 */

export function PdModals(props) {
  const {
    children,
    handleClose = () => {},
    visible = false,
    closable = true,
    footer = null,
    title = false,
    // wrapClassName = 'pd-guest-modal',
  } = props;
  return (
    <Modal
      {...props}
      title={title}
      centered
      destroyOnClose={true}
      footer={footer}
      onCancel={handleClose}
      open={visible}
      closable={closable}
      // wrapClassName={wrapClassName}
      >
      {children}
    </Modal>
  );
}
