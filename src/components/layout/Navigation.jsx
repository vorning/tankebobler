import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import CharacterAvatar from "../characters/CharacterAvatar";
import PersonalAvatar from "../characters/PersonalAvatar";
import {
  Home,
  User,
  BookOpen,
  Trophy,
  Menu,
  X,
  Brain,
  Star,
} from "lucide-react";
import "./Navigation.css";

const Navigation = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);

  const navItems = [
    { path: "/", label: "Hjem", icon: Home },
    { path: "/laeringssti", label: "Læringsstier", icon: BookOpen },
    { path: "/profil", label: "Profil", icon: User },
    { path: "/praestation", label: "Præstationer", icon: Trophy },
  ];

  useEffect(() => {
    if (user.level > 1) {
      setShowLevelUpAnimation(true);
      const timer = setTimeout(() => setShowLevelUpAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [user.level]);

  useEffect(() => {
    if (user.created) {
      setTimeout(() => setAnimateProgress(true), 200);
    }
  }, [user.created]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getXPPercentage = () => {
    const xpForNextLevel = user.level * 100;
    if (xpForNextLevel === 0) return 0;
    return Math.round((user.xp / xpForNextLevel) * 100);
  };

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/" className="brand-link">
              <div className="brand-icon">
                <Brain size={28} />
              </div>
              <div className="brand-text">
                <h1>Tankebobler</h1>
                <span>Filosofi for unge tænkere</span>
              </div>
            </Link>
          </div>

          <div className="nav-menu desktop-only">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${
                    isActivePath(item.path) ? "active" : ""
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {user.created && (
            <div className="nav-user">
              <div className="user-stats">
                <div
                  className={`level-indicator ${
                    showLevelUpAnimation ? "animate-level-up" : ""
                  }`}
                >
                  <Brain size={16} />
                  <span>{user.level}</span>
                </div>
                <div className="xp-indicator">
                  <Star size={14} />
                  <span>{user.xp}</span>
                </div>
              </div>

              <Link to="/profil" className="user-avatar">
                <PersonalAvatar
                  avatar={user.avatar || "student1"}
                  size="small"
                />
              </Link>

              <div className="user-progress desktop-only">
                <div className="progress-text">
                  <span className="user-name">{user.name}</span>
                  <span className="level-text">Level {user.level}</span>
                </div>
                <div className="mini-progress-bar">
                  <div
                    className={`mini-progress-fill ${
                      animateProgress ? "nav-progress-animated" : ""
                    }`}
                    style={{
                      width: animateProgress ? `${getXPPercentage()}%` : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <button
            className="mobile-menu-button mobile-only"
            onClick={toggleMobileMenu}
            aria-label="Åbn menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className="mobile-only">
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
            {user.created && (
              <div className="mobile-user-info">
                <div className="mobile-user-avatar">
                  <PersonalAvatar
                    avatar={user.avatar || "student1"}
                    size="medium"
                  />
                </div>
                <div className="mobile-user-details">
                  <h3>{user.name}</h3>
                  <div className="mobile-user-stats">
                    <div className="mobile-stat">
                      <Brain size={16} />
                      <span>Level {user.level}</span>
                    </div>
                    <div className="mobile-stat">
                      <Star size={16} />
                      <span>{user.xp} XP</span>
                    </div>
                    <div className="mobile-stat">
                      <Trophy size={16} />
                      <span>{user.achievements.length}</span>
                    </div>
                  </div>
                  <div className="mobile-progress">
                    <div className="mobile-progress-bar">
                      <div
                        className={`mobile-progress-fill ${
                          animateProgress ? "nav-progress-animated" : ""
                        }`}
                        style={{
                          width: animateProgress
                            ? `${getXPPercentage()}%`
                            : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mobile-nav-items">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-nav-item ${
                      isActivePath(item.path) ? "active" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent size={24} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default Navigation;
