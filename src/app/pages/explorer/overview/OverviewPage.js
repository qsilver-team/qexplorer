import { Typography, LinearProgress } from '@mui/material';
import { useSocket } from 'src/app/context/SocketContext';
import { useEffect } from 'react';
import { formatString } from 'src/app/utils/function';
import CardItem from '../../components/CardItem/CardItem';

function OverviewPage() {
  const { marketcap, loading, sendMessage } = useSocket();

  useEffect(() => {
    sendMessage('marketcap');
  }, [sendMessage]);

  if (loading) {
    return (
      <div className="w-full absolute">
        <LinearProgress />
      </div>
    );
  }

  console.log(marketcap);
  return (
    <>
      <div className="container px-12 py-24 md:px-24">
        <div className="px-28 py-20 bg-gray-80 rounded-8">
          <div className="grid grid-flow-col gap-16">
            <CardItem className="flex flex-col py-16 px-24 gap-16">
              <div className="flex gap-24 items-center">
                <img className="w-24 h-24" src="assets/icons/dollar-sign.svg" alt="icon" />
                <Typography className="text-20 text-primary-70 font-mont">Price</Typography>
              </div>
              <Typography className="font-space text-28 text-white">${marketcap?.price}</Typography>
            </CardItem>
            <CardItem className="flex flex-col py-16 px-24 gap-16">
              <div className="flex gap-24 items-center">
                <img className="w-24 h-24" src="assets/icons/globe.svg" alt="icon" />
                <Typography className="text-20 text-primary-70 font-mont">Market Cap</Typography>
              </div>
              <Typography className="font-space text-28 text-white">
                ${formatString(marketcap?.marketcap)}
              </Typography>
            </CardItem>
            <CardItem className="flex flex-col py-16 px-24 gap-16">
              <div className="flex gap-24 items-center">
                <img className="w-24 h-24" src="assets/icons/circle-dashed.svg" alt="icon" />
                <Typography className="text-20 text-primary-70 font-mont">Supply</Typography>
              </div>
              <Typography className="font-space text-28 text-white">
                {formatString(marketcap?.supply)}
              </Typography>
            </CardItem>
          </div>
        </div>
      </div>
    </>
  );
}

export default OverviewPage;