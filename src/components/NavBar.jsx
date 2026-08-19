export default function NavBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'single', label: 'Single', icon: '◇' },
    { id: 'stack', label: 'Stack', icon: '≡' },
    { id: 'mosaic', label: 'Mosaic', icon: '⊞' },
  ];

  return (
    <nav className="navbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item${activeTab === tab.id ? ' active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
