import {
  INITIAL_PRODUCE,
  INITIAL_EQUIPMENT,
  INITIAL_USERS,
  INITIAL_CONVERSATIONS,
  INITIAL_FOLLOWS
} from '../data/mockData';

const STORAGE_KEYS = {
  PRODUCE: 'kisan_setu_produce_v1',
  EQUIPMENT: 'kisan_setu_equipment_v1',
  USERS: 'kisan_setu_users_v1',
  CONVERSATIONS: 'kisan_setu_conversations_v1',
  FOLLOWS: 'kisan_setu_follows_v1',
  CURRENT_ROLE: 'kisan_setu_role_v1'
};

export const storageService = {
  // Role
  getCurrentRole: () => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || 'farmer';
  },
  getActiveRole: () => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || 'farmer';
  },
  setCurrentRole: (role) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, role);
  },
  setActiveRole: (role) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, role);
  },

  // Users
  getUserProfile: (role) => {
    return INITIAL_USERS[role] || INITIAL_USERS.farmer;
  },
  getCurrentUser: () => {
    const role = localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || 'farmer';
    return INITIAL_USERS[role] || INITIAL_USERS.farmer;
  },

  // Produce
  getProduceListings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed reading produce from localStorage', e);
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCE, JSON.stringify(INITIAL_PRODUCE));
    return INITIAL_PRODUCE;
  },
  addProduceListing: (newListing) => {
    const list = storageService.getProduceListings();
    const updated = [newListing, ...list];
    localStorage.setItem(STORAGE_KEYS.PRODUCE, JSON.stringify(updated));
    return updated;
  },
  deleteProduceListing: (id) => {
    const list = storageService.getProduceListings();
    const updated = list.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCE, JSON.stringify(updated));
    return updated;
  },
  updateProduceStatus: (id, status) => {
    const list = storageService.getProduceListings();
    const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(STORAGE_KEYS.PRODUCE, JSON.stringify(updated));
    return updated;
  },

  // Equipment
  getEquipmentListings: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EQUIPMENT);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed reading equipment from localStorage', e);
    }
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(INITIAL_EQUIPMENT));
    return INITIAL_EQUIPMENT;
  },
  addEquipmentListing: (newEquipment) => {
    const list = storageService.getEquipmentListings();
    const updated = [newEquipment, ...list];
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(updated));
    return updated;
  },

  // Conversations / Chat
  getConversations: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed reading conversations', e);
    }
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(INITIAL_CONVERSATIONS));
    return INITIAL_CONVERSATIONS;
  },
  addMessage: (convId, messageObj) => {
    const convs = storageService.getConversations();
    const updated = convs.map((c) => {
      if (c.id === convId) {
        return {
          ...c,
          lastMessage: messageObj.text,
          lastTimestamp: messageObj.timestamp,
          messages: [...c.messages, messageObj]
        };
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(updated));
    return updated;
  },
  startOrGetConversationWithItem: (item, currentUser) => {
    const convs = storageService.getConversations();
    const existing = convs.find(
      (c) => c.produceId === item.id || c.participant?.id === (item.farmerId || item.providerId)
    );
    if (existing) return existing.id;

    const newId = `CONV-${Date.now()}`;
    const newConv = {
      id: newId,
      produceId: item.id,
      itemTitle: item.cropName || item.title,
      participant: {
        id: item.farmerId || item.providerId || 'PART-USER',
        name: item.farmerName || item.providerName || 'Provider',
        role: item.farmerId ? 'farmer' : 'provider',
        avatar: item.image
      },
      lastMessage: `Hello, I am interested in your listing: ${item.cropName || item.title}`,
      lastTimestamp: 'Just now',
      unread: false,
      messages: [
        {
          id: `M-${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: `Namaste, I am interested in your listing: ${item.cropName || item.title}. Is this still available for trade?`,
          timestamp: 'Just now'
        }
      ]
    };
    const updated = [newConv, ...convs];
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(updated));
    return newId;
  },

  // Follows
  getFollows: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FOLLOWS);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed reading follows', e);
    }
    localStorage.setItem(STORAGE_KEYS.FOLLOWS, JSON.stringify(INITIAL_FOLLOWS));
    return INITIAL_FOLLOWS;
  },
  toggleFollow: (target) => {
    const list = storageService.getFollows();
    const exists = list.some((f) => f.id === target.id);
    let updated;
    if (exists) {
      updated = list.filter((f) => f.id !== target.id);
    } else {
      updated = [
        ...list,
        {
          id: target.id,
          name: target.name,
          type: target.type || 'farmer',
          location: target.location || 'Central India',
          crops: target.crops || 'Produce'
        }
      ];
    }
    localStorage.setItem(STORAGE_KEYS.FOLLOWS, JSON.stringify(updated));
    return updated;
  },
  isFollowing: (targetId) => {
    const list = storageService.getFollows();
    return list.some((f) => f.id === targetId);
  },

  // Reset
  resetAll: () => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCE);
    localStorage.removeItem(STORAGE_KEYS.EQUIPMENT);
    localStorage.removeItem(STORAGE_KEYS.CONVERSATIONS);
    localStorage.removeItem(STORAGE_KEYS.FOLLOWS);
    window.location.reload();
  }
};
