import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import { useSocket } from 'src/app/context/SocketContext';
import ErrorDialog from '../ErrorDialog';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [searchAvailable, setSearchAvailable] = useState(false);
  const navigate = useNavigate();
  const { tx, tick, address, fetchError, sendMessage } = useSocket();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && keyword !== '') {
      sendMessage(keyword);
      setSearchAvailable(true);
    }
  };
  useEffect(() => {
    if (searchAvailable) {
      if (Object.keys(address).length > 0 && address?.address === keyword) {
        navigate(`/explorer/address/${keyword}`);
      } else if (Object.keys(tick).length > 0 && +tick?.tick === +keyword) {
        navigate(`/explorer/tick/${keyword}`);
      } else if (Object.keys(tx).length > 0) {
        navigate(`/explorer/tx/${keyword}`);
      } else {
        setErrorOpen(true);
      }
      setKeyword('');
      setSearchAvailable(false);
    }
  }, [address, tick, tx, fetchError]);
  return (
    <>
      <Input
        className="w-full border-1 px-12 text-main-30 text-urb text-14 bg-main-100"
        placeholder="Search Address, TX, blocks..."
        value={keyword}
        disableUnderline
        autoFocus
        startAdornment={
          <FuseSvgIcon className="mr-20 w-14 h-12 text-main-30">
            heroicons-outline:search
          </FuseSvgIcon>
        }
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyDown={handleKeyPress}
        style={{
          boxShadow: '0 5px 10px rgba(255, 255, 255, 0.1), 0 6px 6px rgba(255, 255, 255, 0.1)',
        }}
      />
      <ErrorDialog open={errorOpen} handleClose={() => setErrorOpen(false)} />
    </>
  );
};

export default SearchBar;
