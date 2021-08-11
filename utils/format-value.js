import BN from 'bn.js';

const formatBalance = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e9) return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (n >= 1e9 && n < 1e12) return '≈' + (n / 1e9).toFixed(1) + 'B';
};
const formatValue = (n) => {
  if (n < 1e3) return n;
if (n >= 1e3 && n < 1e9) return n.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
if (n >= 1e9 && n < 1e12) return '≈' + (n / 1e9).toFixed(1) + 'B';
};
const wrapNumber = (n) => {
  return n.replace(",", ".").replace(/[^0-9\.]/g, "");
};

const formatStakeAmount = (n) => {
  if (!n) {
    return '(null)';
  }
  if (n.isZero()) {
    return '0.00';
  }
  if (n.lt(new BN('10000000', 10))) {
    return '< 0.01';
  }
   n = n.div(new BN('10000000', 10)).toNumber()/100;
   return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const formatAmount = (n) => {
  n = n.div(new BN('10000000', 10)).toNumber()/100;
  return n.toFixed(2);
}
// TO DO for large numbers
const formatReward = (n) => {
  n = n.div(new BN('100000', 10)).toNumber()/10000;
  return n.toFixed(4);
}

export { formatBalance, formatValue, wrapNumber, formatStakeAmount, formatReward, formatAmount};
