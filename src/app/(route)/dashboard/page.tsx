import { useState } from 'react';
import NewDashboardModal from './_components/NewDashboardModal';
import { createPortal } from 'react-dom';

export default function page() {
  const [newDashboardModal, setNewDashboardModal] = useState(false);
  const [portalElement, setPortalElemnt] = useState<Element | null>(null);
  return <NewDashboardModal />;
}
