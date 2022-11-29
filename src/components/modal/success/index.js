import PdTitle from 'components/pd-title';

import success from 'assets/images/success.png';
import failed from 'assets/images/failed.png'
import './style.scss';

/**
 *
 * @param {Function} props.onFinish function that recieve value
 */

export function Success({
  title = 'Are you sure to verify now?',
  desc = 'Verify your account',
}) {
  return (
    <div className="pd-guest-modal-verif">
      <div className="header">
        <img src={success} alt="ask-img" />
      </div>
      <div className="content">
        <PdTitle size="extra-small">{title}</PdTitle>
        <div>{desc}</div>
      </div>
    </div>
  );
}

export function Failed({
  title = 'Are you sure to verify now?',
  desc = 'Verify your account',
}) {
  return (
    <div className="pd-guest-modal-verif">
      <div className="header">
        <img src={failed} alt="ask-img" />
      </div>
      <div className="content">
        <PdTitle size="extra-small">{title}</PdTitle>
        <p>{desc}</p>
      </div>
    </div>
  );
}
