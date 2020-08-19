import Link from "next/link";
import {useContext, useState} from "react";
import {LanguageContext} from "./LanguageContext";

export default () => {
    const [languages] = useState([
        {
            code: "en",
            name: "English",
        },
        {
            code: "mn",
            name: "Mongolia",
        },
    ]);
    let query = useContext(LanguageContext)
    return (
        <ul>
            {languages.map((language) => {
                return (
                    <li onClick={() => query.setLanguage(language.code)} key={language.code}>
                        <Link href={{pathname: `/`, query: {lang: language.code}}}>
                            <a>{language.code}</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};