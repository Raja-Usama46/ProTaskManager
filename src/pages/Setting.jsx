import { Card, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

export default function Settings() {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const handleThemeChange = (checked) => {
    dispatch(toggleTheme());
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <h1 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Settings
      </h1>
      
      <Card 
        title="Appearance" 
        className="mb-4"
        headStyle={{ 
          backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
          color: theme === 'dark' ? 'white' : 'inherit'
        }}
        bodyStyle={{ backgroundColor: theme === 'dark' ? '#111827' : 'white' }}
      >
        <div className="flex justify-between items-center">
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
            Dark Mode
          </span>
          <Switch 
            checked={theme === 'dark'} 
            onChange={handleThemeChange}
          />
        </div>
      </Card>

      <Card 
        title="Notifications"
        headStyle={{ 
          backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
          color: theme === 'dark' ? 'white' : 'inherit'
        }}
        bodyStyle={{ backgroundColor: theme === 'dark' ? '#111827' : 'white' }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
            Email Notifications
          </span>
          <Switch defaultChecked />
        </div>
        <div className="flex justify-between items-center">
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
            Push Notifications
          </span>
          <Switch defaultChecked />
        </div>
      </Card>
    </div>
  );
}