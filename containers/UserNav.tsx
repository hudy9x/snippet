import React, { useEffect, useRef, useState } from "react";
import UserInfo from "../components/UserInfo";
import { signOutNow } from "../services/sign";

function UserNav() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const showMenu = () => {
    setVisible(true);
  };

  useEffect(() => {
    const onClickOutside = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      const container = ref.current;
      if (!target || !container) return;

      if (
        !container.contains(target) &&
        container.classList.contains("showup") &&
        !target.closest(".main-menu")
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <div className="main-menu">
      <div onClick={showMenu} className="">
        <UserInfo />
      </div>
      <div
        ref={ref}
        className={`main-menu-container ${visible ? "showup" : ""}`}
      >
        <div className="py-2">
          <div className="main-menu-item inactive">
            <span>📋</span>
            <span>Thông tin cá nhân</span>
          </div>

          <div className="main-menu-item inactive">
            <span>☕️</span>
            <span>Lưu lại xem sau</span>
          </div>

          <div className="main-menu-item inactive">
            <span>📂</span>
            <span>Code của mị</span>
          </div>
        </div>

        <div className="py-2">
          <div
            onClick={() => {
              signOutNow();
            }}
            className="main-menu-item"
          >
            <span>💀</span>
            <span>Đăng xuất khỏi thế giới</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNav;
