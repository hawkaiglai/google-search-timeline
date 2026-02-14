import { create } from 'zustand';

interface UIStore {
  isSidebarOpen: boolean;
  isFilterPanelOpen: boolean;
  isMilestoneModalOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  
  toggleSidebar: () => void;
  toggleFilterPanel: () => void;
  toggleMilestoneModal: () => void;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
  
  openSidebar: () => void;
  closeSidebar: () => void;
  openFilterPanel: () => void;
  closeFilterPanel: () => void;
  openMilestoneModal: () => void;
  closeMilestoneModal: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  
  closeAll: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: false,
  isFilterPanelOpen: false,
  isMilestoneModalOpen: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,

  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleFilterPanel: () => set(state => ({ isFilterPanelOpen: !state.isFilterPanelOpen })),
  toggleMilestoneModal: () => set(state => ({ isMilestoneModalOpen: !state.isMilestoneModalOpen })),
  toggleSearch: () => set(state => ({ isSearchOpen: !state.isSearchOpen })),
  toggleMobileMenu: () => set(state => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openFilterPanel: () => set({ isFilterPanelOpen: true }),
  closeFilterPanel: () => set({ isFilterPanelOpen: false }),
  openMilestoneModal: () => set({ isMilestoneModalOpen: true }),
  closeMilestoneModal: () => set({ isMilestoneModalOpen: false }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  closeAll: () => set({
    isSidebarOpen: false,
    isFilterPanelOpen: false,
    isMilestoneModalOpen: false,
    isSearchOpen: false,
    isMobileMenuOpen: false,
  }),
}));
