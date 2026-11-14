import React from "react";
import "./PageHeader.css";

export default function PageHeader({ subtitle, title, description, badgeText, badgeIcon: Icon }) {
  return (
    <div className="global-page-header">
      <div className="header-text-content">
        {subtitle && <span className="header-subtitle">{subtitle}</span>}
        <h1 className="header-title">{title}</h1>
        {description && <p className="header-description">{description}</p>}
      </div>
      {(badgeText || Icon) && (
        <div className="header-badge">
          {Icon && <Icon size={16} />}
          <span>{badgeText}</span>
        </div>
      )}
    </div>
  );
}