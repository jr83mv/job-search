import { useTranslation } from 'react-i18next';
import LanguageSelector from './languageSelector';
import { useState } from 'react';

function Navbar(props:any) {
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState('');

  const handleSearchClick = () => {
    props.setSearchDetails(searchText);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="w-full bg-slate-700 flex justify-between flex py-3 items-center px-10">
      <div className="text-xl text-white font-bold">{t('jobs')}</div>
      <div className="flex border rounded-full bg-slate-800 border-slate-800 items-center">
        <input type="text" placeholder={`${t('search')}`} className="rounded-full bg-slate-800 border-slate-800 outline-none pl-10 items-center text-white text-xl" value={searchText}
          onChange={handleInputChange}/>
        <img src="./searchBar.svg" alt="" className="" onClick={handleSearchClick}/>
      </div>
      <div className="flex h-[35px] gap-[20px]">
        <LanguageSelector />
        <img src="./notification.png" alt="" className="w-[30px] h-[30px]" />
        <img src="./user.png" alt="" className="w-[30px] h-[30px]" />
      </div>
    </div>
  );
}

export default Navbar;
