// import { createContext, PropsWithChildren, useContext } from 'react';
// import { useTranslation } from 'react-i18next';
//
// const TranslateContext = createContext<any>({ t: () => {}, changeLanguage: () => {} });
// const TranslateProvider = ({ children }: PropsWithChildren) => {
//   const { t, i18n } = useTranslation();
//   const changeLanguage = (lng: string) => {
//     i18n.changeLanguage(lng);
//   };
//   const value = {
//     t,
//     changeLanguage,
//   };
//   return <TranslateContext.Provider value={value}>{children}</TranslateContext.Provider>;
// };
// export default TranslateProvider;
// export const useTranslateContext = () => useContext(TranslateContext);
