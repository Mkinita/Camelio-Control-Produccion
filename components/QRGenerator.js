import QRCode from 'qrcode.react';

function QRGenerator({orden}) {
    
  return (
    <div className='flex justify-center items-center h-full'>
      <QRCode value={orden} />
    </div>
  );
}

export default QRGenerator;
