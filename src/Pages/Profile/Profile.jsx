import { useProfileState } from "../../Hooks/useProfileState";
import { ProfileIcon } from "./components/ProfileIcons";
import ProfileHero from "./components/ProfileHero/ProfileHero";
import ProfileDetailsSection from "./components/ProfileDetailsSection/ProfileDetailsSection";
import ProfileSecuritySection from "./components/ProfileSecuritySection/ProfileSecuritySection";
import ProfileNotificationsSection from "./components/ProfileNotificationsSection/ProfileNotificationsSection";
import ProfilePreferencesSection from "./components/ProfilePreferencesSection/ProfilePreferencesSection";
import ProfileAccountSection from "./components/ProfileAccountSection/ProfileAccountSection";
import ProfileModals from "./components/ProfileModals/ProfileModals";
import "./Profile.css";

export default function Profile() {
  const {
    section,
    userData,
    setUserData,
    twoFactor,
    toggleTwoFactor,
    sessions,
    closeSession,
    closeOtherSessions,
    notifs,
    toggleNotif,
    prefs,
    setPref,
    modal,
    setModal,
    toast,
    notify,
    percent,
    nextStep
  } = useProfileState();

  return (
    <div className="cfg">
      <ProfileHero
        userData={userData}
        percent={percent}
        nextStep={nextStep}
        onOpenAvatar={() => setModal("avatar")}
      />

      <div className="cfg-layout">
        <main className="cfg-panel" key={section}>
          {section === "perfil" && (
            <ProfileDetailsSection
              userData={userData}
              onEdit={() => setModal("edit")}
              onAvatar={() => setModal("avatar")}
            />
          )}

          {section === "seguridad" && (
            <ProfileSecuritySection
              twoFactor={twoFactor}
              onToggleTwoFactor={toggleTwoFactor}
              sessions={sessions}
              onOpenPassword={() => setModal("password")}
              onCloseSession={closeSession}
            />
          )}

          {section === "notificaciones" && (
            <ProfileNotificationsSection
              notifs={notifs}
              onToggleNotif={toggleNotif}
            />
          )}

          {section === "preferencias" && (
            <ProfilePreferencesSection
              prefs={prefs}
              onSetPref={setPref}
            />
          )}

          {section === "cuenta" && (
            <ProfileAccountSection
              onLogout={() => notify("Sesión finalizada")}
              onCloseOtherSessions={closeOtherSessions}
              onOpenDelete={() => setModal("delete")}
            />
          )}
        </main>
      </div>

      <ProfileModals
        modal={modal}
        userData={userData}
        onClose={() => setModal(null)}
        onSaveProfile={(form) => {
          setUserData({ ...userData, ...form });
          setModal(null);
          notify("Datos actualizados");
        }}
        onSaveAvatar={(url) => {
          setUserData({ ...userData, avatar: url });
          setModal(null);
          notify("Foto actualizada");
        }}
        onRemoveAvatar={() => {
          setUserData({ ...userData, avatar: null });
          setModal(null);
          notify("Foto eliminada");
        }}
        onSavePassword={() => {
          setModal(null);
          notify("Contraseña actualizada");
        }}
        onConfirmDelete={() => {
          setModal(null);
          notify("Cuenta eliminada");
        }}
      />

      {toast && (
        <div className={`cfg-toast ${toast.type === "error" ? "is-error" : ""}`} role="status" key={toast.id}>
          <ProfileIcon name="check" size={16} />
          {toast.msg}
        </div>
      )}
    </div>
  );
}