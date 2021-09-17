export const getHelpKey = (type: string) => {
  const lc = type.toLowerCase();
  if (lc.includes('sysupgrade')) {
    return 'sysupgrade-help';
  }
  if (lc.includes('factory') || lc === 'trx' || lc === 'chk') {
    return 'factory-help';
  }
  if (lc.includes('kernel') || lc.includes('zimage') || lc.includes('uimage')) {
    return 'kernel-help';
  }
  if (lc.includes('root')) {
    return 'rootfs-help';
  }
  if (lc.includes('sdcard')) {
    return 'sdcard-help';
  }
  if (lc.includes('tftp')) {
    return 'tftp-help';
  }
  return 'other-help';
};
