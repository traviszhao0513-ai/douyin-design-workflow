/**
 * Douyin Delight UI Kit — Component Library Entry
 *
 * Import tokens CSS once at your app root:
 *   import "@/ui/tokens.css";
 */

// ─── Existing ──────────────────────────────────────────────────────────────
export { Button }      from "./components/Button/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button/Button";

export { Input, SearchInput } from "./components/Input/Input";
export type { InputProps, SearchInputProps, InputSize, InputVariant, InputStatus } from "./components/Input/Input";

export { Card, CardGrid } from "./components/Card/Card";
export type { CardProps, CardGridProps, CardVariant, CardSize } from "./components/Card/Card";

// ─── Avatar ────────────────────────────────────────────────────────────────
export { Avatar, AvatarGroup } from "./components/Avatar/Avatar";
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarShape, AvatarStatus } from "./components/Avatar/Avatar";

// ─── Badge & Tag ───────────────────────────────────────────────────────────
export { Badge, Tag } from "./components/Badge/Badge";
export type { BadgeProps, BadgeColor, TagProps, TagColor, TagVariant } from "./components/Badge/Badge";

// ─── Checkbox ─────────────────────────────────────────────────────────────
export { Checkbox, CheckboxGroup } from "./components/Checkbox/Checkbox";
export type { CheckboxProps, CheckboxGroupProps } from "./components/Checkbox/Checkbox";

// ─── Radio ────────────────────────────────────────────────────────────────
export { Radio, RadioGroup } from "./components/Radio/Radio";
export type { RadioProps, RadioGroupProps, RadioOption } from "./components/Radio/Radio";

// ─── Toggle ───────────────────────────────────────────────────────────────
export { Toggle } from "./components/Toggle/Toggle";
export type { ToggleProps, ToggleSize } from "./components/Toggle/Toggle";

// ─── Divider ──────────────────────────────────────────────────────────────
export { Divider } from "./components/Divider/Divider";
export type { DividerProps, DividerOrientation, DividerWeight } from "./components/Divider/Divider";

// ─── Skeleton ─────────────────────────────────────────────────────────────
export { Skeleton, SkeletonCard } from "./components/Skeleton/Skeleton";
export type { SkeletonProps, SkeletonVariant, SkeletonCardProps } from "./components/Skeleton/Skeleton";

// ─── Modal ────────────────────────────────────────────────────────────────
export { Modal } from "./components/Modal/Modal";
export type { ModalProps, ModalSize } from "./components/Modal/Modal";

// ─── Toast ────────────────────────────────────────────────────────────────
export { ToastProvider, useToast } from "./components/Toast/Toast";
export type { ToastItem, ToastType, ToastProviderProps } from "./components/Toast/Toast";

// ─── Tabs ─────────────────────────────────────────────────────────────────
export { Tabs } from "./components/Tabs/Tabs";
export type { TabsProps, TabItem, TabsVariant, TabsSize } from "./components/Tabs/Tabs";

// ─── Select ───────────────────────────────────────────────────────────────
export { Select } from "./components/Select/Select";
export type { SelectProps, SelectOption, SelectSize, SelectVariant } from "./components/Select/Select";

// ─── Tooltip ──────────────────────────────────────────────────────────────
export { Tooltip } from "./components/Tooltip/Tooltip";
export type { TooltipProps, TooltipPlacement, TooltipTrigger } from "./components/Tooltip/Tooltip";

// ─── Douyin-specific ───────────────────────────────────────────────────────
export { PushNotification } from "./components/PushNotification/PushNotification";
export type { PushNotificationProps } from "./components/PushNotification/PushNotification";

export { VideoCard } from "./components/VideoCard/VideoCard";
export type { VideoCardProps } from "./components/VideoCard/VideoCard";

export { ActionBar } from "./components/ActionBar/ActionBar";
export type { ActionBarProps } from "./components/ActionBar/ActionBar";

export { BottomNav } from "./components/BottomNav/BottomNav";
export type { BottomNavProps, BottomNavItem } from "./components/BottomNav/BottomNav";
