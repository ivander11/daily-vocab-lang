import type { DisplayMode, Profile, ProgressSummary } from '../types';

interface SettingsScreenProps {
  profile: Profile;
  summary: ProgressSummary;
  onDisplayModeChange: (mode: DisplayMode) => void;
  onSignOut: () => void;
}

const displayModes: Array<{ value: DisplayMode; label: string }> = [
  { value: 'both', label: 'Both' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'simplified', label: 'Simplified' }
];

export function SettingsScreen({
  profile,
  summary,
  onDisplayModeChange,
  onSignOut
}: SettingsScreenProps) {
  return (
    <section className="settings-screen">
      <header>
        <p className="eyebrow">Progress</p>
        <h1>{profile.estimatedLevel}</h1>
      </header>
      <div className="stats-grid">
        <Stat label="Known" value={summary.known} />
        <Stat label="Learning" value={summary.learning} />
        <Stat label="New" value={summary.new} />
        <Stat label="Unseen" value={summary.unseen} />
      </div>
      <section className="settings-section">
        <h2>Chinese Display</h2>
        <div className="segmented-control">
          {displayModes.map((mode) => (
            <button
              key={mode.value}
              type="button"
              className={profile.chineseDisplayMode === mode.value ? 'selected' : ''}
              onClick={() => onDisplayModeChange(mode.value)}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </section>
      <button type="button" className="secondary-button" onClick={onSignOut}>
        Sign out
      </button>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat">
      <span>{value}</span>
      <p>{label}</p>
    </div>
  );
}
