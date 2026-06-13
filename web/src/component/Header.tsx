import { NavLink } from "react-router";
import CustomSelect from "./Select";
import { ListBox } from "@heroui/react";
import { LANGUAGE_SELECTION, type ValueLanguage } from "../constant";
import { useTranslation } from "../translations";
import { useState } from "react";
import Profile from "./Profile";

export default function Header() {
  const { translate, i18n } = useTranslation();
  const [language, setLanguage] = useState<ValueLanguage>("en");

  return (
    <nav className="p-4 text-white bg-black border-b-2 py-4 border-violet-500 flex items-center justify-between h-28">
      <NavLink to="/" end className="text-xl font-bold">
        Image/Video Converter
      </NavLink>

      <div className="flex items-center gap-6">
        <CustomSelect
          selectProps={{
            value: language,
            onChange: (value) => {
              setLanguage(value as ValueLanguage);
              i18n.changeLanguage(value as ValueLanguage);
            },
          }}
          extractId={(item) => item.id}
          itemsRender={(item) => (
            <ListBox.Item id={item.value} textValue={item.value}>
              {item.title}
            </ListBox.Item>
          )}
          items={LANGUAGE_SELECTION}
        />
        <NavLink to="/" end>
          {translate("page.home")}
        </NavLink>
        <NavLink to="/about" end>
          {translate("page.about")}
        </NavLink>
        <Profile />
      </div>
    </nav>
  );
}
