import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const handleLanguageChange = (e:any) => {
        i18n.changeLanguage(e.target.value);
    };
    return (
        <select onChange={handleLanguageChange} value={i18n.language} className="p-1 outline-none rounded-xl text-white bg-slate-800  px-3 flex justify-center text-center">
            <option value="en">English</option>
            <option value="fr">French</option>
        </select>
    );
};

export default LanguageSelector;