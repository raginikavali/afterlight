import { motion, AnimatePresence } from 'framer-motion';
import { type Building } from '../data/buildings';
import { isSpaceAvailable } from '../engine/availability';
import { minutesToTime } from '../engine/time';
import { useIsMobile } from '../hooks/useMediaQuery';

interface BuildingInspectorProps {
  building: Building | null;
  currentTime: number;
  onClose: () => void;
}

export default function BuildingInspector({ building, currentTime, onClose }: BuildingInspectorProps) {
  const isMobile = useIsMobile();

  if (!building) return null;

  const available = isSpaceAvailable(building, currentTime);
  const status = available ? 'AVAILABLE' : 'OCCUPIED';

  const content = (
    <div className="relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center text-afterlight-text-muted hover:text-afterlight-text-primary transition-colors"
        aria-label="Close inspector"
      >
        ×
      </button>

      {/* Building ID */}
      <div className="text-label mb-4">BUILDING / {building.id}</div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-afterlight-text-primary tracking-tight mb-6">
        {building.name.toUpperCase()}
      </h3>

      {/* Metadata grid */}
      <div className="space-y-4">
        <MetaRow label="TYPE" value={building.type.toUpperCase().replace('-', ' ')} />
        <MetaRow label="CAPACITY" value={`${building.capacity}`} />
        <MetaRow
          label="AVAILABLE"
          value={`${minutesToTime(building.availableFrom)} — ${minutesToTime(building.availableTo)}`}
        />
        <MetaRow label="ACCESS" value={building.access.toUpperCase()} />
        <MetaRow
          label="PERMITTED USE"
          value={building.permittedUses.map(u => u.toUpperCase()).join(' / ')}
        />
        <MetaRow label="FLOORS" value={`${building.floors}`} />
        <MetaRow label="DISTANCE" value={`${building.distanceToNeeds} KM`} />

        <div className="pt-3 border-t border-afterlight-line">
          <MetaRow
            label="STATUS"
            value={status}
            highlight={available}
          />
        </div>
      </div>
    </div>
  );

  // Mobile: bottom sheet | Desktop: side panel
  return (
    <AnimatePresence>
      {building && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={`fixed z-50 bg-afterlight-surface border border-afterlight-line ${
              isMobile
                ? 'bottom-0 left-0 right-0 rounded-t-2xl p-6 pb-8 max-h-[70vh] overflow-y-auto'
                : 'top-1/2 right-8 -translate-y-1/2 w-80 rounded-lg p-6'
            }`}
            initial={isMobile ? { y: '100%' } : { x: 40, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
            exit={isMobile ? { y: '100%' } : { x: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 rounded-full bg-afterlight-line" />
              </div>
            )}
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MetaRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[10px] tracking-[0.15em] text-afterlight-text-muted shrink-0">
        {label}
      </span>
      <span
        className={`text-xs font-mono tracking-wider text-right ${
          highlight ? 'text-afterlight-amber' : 'text-afterlight-text-secondary'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
