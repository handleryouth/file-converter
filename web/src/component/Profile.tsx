import { Dropdown, Button, Label, Avatar } from "@heroui/react";
import personIcon from "../assets/icons/person.svg";
import settingsIcon from "../assets/icons/settings.svg";
import signOutIcon from "../assets/icons/sign-out.svg";
import { useTranslation } from "../translations";
import { useNavigate } from "react-router";

export default function Profile() {
  const { translate } = useTranslation();
  const navigate = useNavigate();
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Menu" variant="secondary">
        <Avatar>
          <Avatar.Image alt="Person" src={personIcon} />
          <Avatar.Fallback>Person</Avatar.Fallback>
        </Avatar>
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              navigate("/profile-settings");
            }}
          >
            <img src={settingsIcon} width={20} height={20} />
            <Label>{translate("common.profileSettings")}</Label>
          </Dropdown.Item>

          <Dropdown.Item>
            <img src={signOutIcon} width={20} height={20} />
            <Label className="text-red-500 font-bold">
              {translate("common.signOut")}
            </Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
