export const TableTypes = {
  SELL_TABLE: 1,
  GIFT_VOUCHER_TABLE: 2,
  CLIENT_TABLE: 3,
  DISCOUNT_TABLE: 4,
  PACKAGES_TABLE: 5,
  SUPPLIER_TABLE: 6,
  STOCK_ORDER_TABLE: 7,
  PRODUCTS_TABLE: 8,
  LOCATION_TABLE: 11,
  SERVICES_TABLE: 12,
}

export const UserRoles = {
  ADMIN: 1,
  STAFF_MEMEBER: 2,
  CLIENT: 3,
}

export const NotificationTypes = {
  ADD_PERSONAL_EVENT: "addPersonalEvent",
  ADD_STAFF: "addStaff",
  BOOK_APPOINTMENT: "bookAppointment",
  DELETE_STAFF: "deleteStaff",
  DELETE_CLIENT: "removeClient",
  ADD_CLIENT: "addClient",
}

export const CheckoutTypes = {
  PRODUCTS: "products",
  SERVICES: "services",
  GIFT_CARDS: "gift-cards",
  PACKAGES: "packages",
  MEMBERSHIPS:"memberships"
}

export const AccessLevels = {
  LOGIN_ACCESS: { text: "Login Access", key: "loginAccess" },
  PIN_ACCESS: { text: "Pin Access", key: "pinAccess" },
  FRONT_OFFICER: { text: "Front Officer", key: "frontOfficer" },
  SERVICE_PROVIDER: { text: "Service Provider", key: "serviceProvider" },
  MANAGER: { text: "Manager", key: "manager" },
  ADMIN: { text: "Admin", key: "admin" },
  OWNER: { text: "Owner", key: "owner" },
};

export const Modes = [
  { label: 'Email' },
  { label: 'SMS' },
];

export const ServicesColor = {
  RED: 'RED',
  BLUE: 'BLUE',
  GREEN: 'GREEN',
  YELLOW: 'YELLOW',
};