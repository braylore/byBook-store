import { Box, Button, Divider, Tooltip, Typography, ClickAwayListener } from '@mui/material';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

interface IAuthQuestionBarProps {
  title: string;
  path: string;
  linkText: string;
}

const AuthQuestionBar: FC<IAuthQuestionBarProps> = ({ linkText, path, title }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <Box
      sx={{
        textAlign: 'center'
      }}
    >
      <Typography component="div">{title}</Typography>
      <Divider
        component="div"
        sx={{
          color: 'info.main',
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        <Link to={path}>{linkText}</Link>
      </Divider>

      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <Box
                sx={{
                  textAlign: 'left'
                }}
              >
                <Box>Email: admin@gmail.com</Box>
                <Box>Пароль: admin123</Box>
              </Box>
            }
          >
            <Button
              variant="outlined"
              size="medium"
              color="inherit"
              sx={{
                mt: '0.5rem',
                width: '75%',
                fontWeight: '500',
                fontSize: '16px'
              }}
              onClick={handleTooltipOpen}
            >
              Данные админа
            </Button>
          </Tooltip>
        </div>
      </ClickAwayListener>
    </Box>
  );
};

export default AuthQuestionBar;
