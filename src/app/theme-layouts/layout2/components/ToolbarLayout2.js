import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import Logo from 'app/theme-layouts/shared-components/Logo';
import SearchBar from 'src/app/pages/components/SearchBar/SearchBar';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import SettingButton from '../../shared-components/SettingButton';
import NavigationSearch from '../../shared-components/NavigationSearch';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';

function ToolbarLayout2(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const toolbarTheme = useSelector(selectToolbarTheme);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md border-b-1 md:mb-14', props.className)}
        color="default"
        style={{ backgroundColor: toolbarTheme.palette.background.paper }}
      >
        <Toolbar className="container justify-between p-0 lg:px-24 min-h-48 md:min-h-64">
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
            </Hidden>
          )}

          <div className="flex ">
            <Hidden lgDown>
              <Logo />
            </Hidden>
          </div>
          <Hidden mdDown>
            <SearchBar />
          </Hidden>
          <div className="flex items-center px-8 h-full overflow-x-auto">
            <Hidden mdUp>
              <NavigationSearch />
            </Hidden>

            <FullScreenToggle />

            <SettingButton />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout2);
