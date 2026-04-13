/**
 * Douyin Delight UI Kit — Figma Code Connect Mappings
 *
 * ⚙️  HOW TO GET THE CORRECT NODE IDs:
 *   1. Open the Figma file: https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx
 *   2. Navigate to the component page (e.g. "⚙️ 按钮 Buttons")
 *   3. Right-click a published component → "Copy link"
 *   4. Extract the node-id from the URL and replace the placeholder below
 *   5. Run: npx @figma/code-connect publish
 *
 * Figma file key: 4clg3rdsyoyTbuZVVEMnUx
 */

import figma from "@figma/code-connect";

import { Button }           from "./components/Button/Button";
import { Input,
         SearchInput }      from "./components/Input/Input";
import { Card }             from "./components/Card/Card";
import { Avatar }           from "./components/Avatar/Avatar";
import { Badge, Tag }       from "./components/Badge/Badge";
import { Checkbox }         from "./components/Checkbox/Checkbox";
import { Radio }            from "./components/Radio/Radio";
import { Toggle }           from "./components/Toggle/Toggle";
import { Divider }          from "./components/Divider/Divider";
import { Skeleton }         from "./components/Skeleton/Skeleton";
import { Modal }            from "./components/Modal/Modal";
import { Tabs }             from "./components/Tabs/Tabs";
import { Select }           from "./components/Select/Select";
import { Tooltip }          from "./components/Tooltip/Tooltip";
import { PushNotification } from "./components/PushNotification/PushNotification";
import { VideoCard }        from "./components/VideoCard/VideoCard";
import { ActionBar }        from "./components/ActionBar/ActionBar";
import { BottomNav }        from "./components/BottomNav/BottomNav";

// ─── Button ──────────────────────────────────────────────────────────────────
figma.connect(
  Button,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=BUTTON_COMPONENT_NODE_ID",
  {
    props: {
      variant: figma.enum("Variant", {
        Primary:   "primary",
        Secondary: "secondary",
        Ghost:     "ghost",
        Danger:    "danger",
      }),
      size: figma.enum("Size", {
        Small:  "sm",
        Medium: "md",
        Large:  "lg",
      }),
      loading:  figma.boolean("Loading"),
      disabled: figma.boolean("Disabled"),
      children: figma.string("Label"),
    },
    example: ({ variant, size, loading, disabled, children }) => (
      <Button variant={variant} size={size} loading={loading} disabled={disabled}>
        {children}
      </Button>
    ),
  }
);

// ─── Input ───────────────────────────────────────────────────────────────────
figma.connect(
  Input,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=INPUT_COMPONENT_NODE_ID",
  {
    props: {
      variant:     figma.enum("Variant", { Filled: "filled", Outlined: "outlined" }),
      size:        figma.enum("Size",    { Small: "sm", Medium: "md", Large: "lg" }),
      status:      figma.enum("Status",  { Default: "default", Success: "success", Warning: "warning", Error: "error" }),
      placeholder: figma.string("Placeholder"),
      label:       figma.string("Label"),
      allowClear:  figma.boolean("AllowClear"),
      disabled:    figma.boolean("Disabled"),
    },
    example: ({ variant, size, status, placeholder, label, allowClear, disabled }) => (
      <Input
        variant={variant}
        size={size}
        status={status}
        placeholder={placeholder}
        label={label}
        allowClear={allowClear}
        disabled={disabled}
      />
    ),
  }
);

// ─── SearchInput ──────────────────────────────────────────────────────────────
figma.connect(
  SearchInput,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=SEARCH_COMPONENT_NODE_ID",
  {
    props: {
      placeholder: figma.string("Placeholder"),
      disabled:    figma.boolean("Disabled"),
    },
    example: ({ placeholder, disabled }) => (
      <SearchInput placeholder={placeholder} disabled={disabled} />
    ),
  }
);

// ─── Card ─────────────────────────────────────────────────────────────────────
figma.connect(
  Card,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=CARD_COMPONENT_NODE_ID",
  {
    props: {
      variant:   figma.enum("Variant", { Elevated: "elevated", Outlined: "outlined", Filled: "filled" }),
      size:      figma.enum("Size",    { Small: "sm", Medium: "md", Large: "lg" }),
      clickable: figma.boolean("Clickable"),
      children:  figma.children("*"),
    },
    example: ({ variant, size, clickable, children }) => (
      <Card variant={variant} size={size} clickable={clickable}>
        {children}
      </Card>
    ),
  }
);

// ─── Avatar ───────────────────────────────────────────────────────────────────
figma.connect(
  Avatar,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=AVATAR_COMPONENT_NODE_ID",
  {
    props: {
      size:  figma.enum("Size",  { XS: "xs", SM: "sm", MD: "md", LG: "lg", XL: "xl" }),
      shape: figma.enum("Shape", { Circle: "circle", Square: "square" }),
      src:   figma.string("ImageURL"),
    },
    example: ({ size, shape, src }) => (
      <Avatar size={size} shape={shape} src={src} />
    ),
  }
);

// ─── Badge ────────────────────────────────────────────────────────────────────
figma.connect(
  Badge,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=BADGE_COMPONENT_NODE_ID",
  {
    props: {
      count: figma.number("Count"),
      dot:   figma.boolean("Dot"),
      color: figma.enum("Color", { Primary: "primary", Danger: "danger", Success: "success" }),
    },
    example: ({ count, dot, color }) => (
      <Badge count={count} dot={dot} color={color} />
    ),
  }
);

// ─── Tag ──────────────────────────────────────────────────────────────────────
figma.connect(
  Tag,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=TAG_COMPONENT_NODE_ID",
  {
    props: {
      color:    figma.enum("Color",   { Default: "default", Primary: "primary", Success: "success", Warning: "warning", Danger: "danger" }),
      variant:  figma.enum("Variant", { Filled: "filled", Outlined: "outlined", Ghost: "ghost" }),
      closable: figma.boolean("Closable"),
      children: figma.string("Label"),
    },
    example: ({ color, variant, closable, children }) => (
      <Tag color={color} variant={variant} closable={closable}>{children}</Tag>
    ),
  }
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────
figma.connect(
  Checkbox,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=CHECKBOX_COMPONENT_NODE_ID",
  {
    props: {
      checked:       figma.boolean("Checked"),
      indeterminate: figma.boolean("Indeterminate"),
      disabled:      figma.boolean("Disabled"),
      label:         figma.string("Label"),
    },
    example: ({ checked, indeterminate, disabled, label }) => (
      <Checkbox checked={checked} indeterminate={indeterminate} disabled={disabled} label={label} />
    ),
  }
);

// ─── Radio ────────────────────────────────────────────────────────────────────
figma.connect(
  Radio,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=RADIO_COMPONENT_NODE_ID",
  {
    props: {
      checked:  figma.boolean("Checked"),
      disabled: figma.boolean("Disabled"),
      label:    figma.string("Label"),
    },
    example: ({ checked, disabled, label }) => (
      <Radio checked={checked} disabled={disabled} label={label} />
    ),
  }
);

// ─── Toggle ───────────────────────────────────────────────────────────────────
figma.connect(
  Toggle,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=TOGGLE_COMPONENT_NODE_ID",
  {
    props: {
      checked:  figma.boolean("Checked"),
      disabled: figma.boolean("Disabled"),
      size:     figma.enum("Size", { Small: "sm", Medium: "md", Large: "lg" }),
    },
    example: ({ checked, disabled, size }) => (
      <Toggle checked={checked} disabled={disabled} size={size} />
    ),
  }
);

// ─── Tabs ─────────────────────────────────────────────────────────────────────
figma.connect(
  Tabs,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=TABS_COMPONENT_NODE_ID",
  {
    props: {
      variant: figma.enum("Variant", { Line: "line", Pill: "pill", Card: "card" }),
    },
    example: ({ variant }) => (
      <Tabs
        variant={variant}
        items={[
          { key: "1", label: "Tab 1" },
          { key: "2", label: "Tab 2" },
        ]}
      />
    ),
  }
);

// ─── Select ───────────────────────────────────────────────────────────────────
figma.connect(
  Select,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=SELECT_COMPONENT_NODE_ID",
  {
    props: {
      placeholder: figma.string("Placeholder"),
      disabled:    figma.boolean("Disabled"),
      size:        figma.enum("Size", { Small: "sm", Medium: "md", Large: "lg" }),
    },
    example: ({ placeholder, disabled, size }) => (
      <Select options={[]} placeholder={placeholder} disabled={disabled} size={size} />
    ),
  }
);

// ─── Tooltip ──────────────────────────────────────────────────────────────────
figma.connect(
  Tooltip,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=TOOLTIP_COMPONENT_NODE_ID",
  {
    props: {
      placement: figma.enum("Placement", { Top: "top", Bottom: "bottom", Left: "left", Right: "right" }),
      content:   figma.string("Content"),
    },
    example: ({ placement, content }) => (
      <Tooltip content={content} placement={placement}>
        <button>Hover me</button>
      </Tooltip>
    ),
  }
);

// ─── PushNotification ─────────────────────────────────────────────────────────
figma.connect(
  PushNotification,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=241180:7345",
  {
    props: {
      title:       figma.string("Title"),
      body:        figma.string("Body"),
      actionLabel: figma.string("ActionLabel"),
    },
    example: ({ title, body, actionLabel }) => (
      <PushNotification title={title} body={body} actionLabel={actionLabel} />
    ),
  }
);

// ─── VideoCard ────────────────────────────────────────────────────────────────
figma.connect(
  VideoCard,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=VIDEOCARD_COMPONENT_NODE_ID",
  {
    props: {
      title:      figma.string("Title"),
      duration:   figma.string("Duration"),
      authorName: figma.string("AuthorName"),
      isLive:     figma.boolean("IsLive"),
    },
    example: ({ title, duration, authorName, isLive }) => (
      <VideoCard
        thumbnail=""
        title={title}
        duration={duration}
        authorName={authorName}
        isLive={isLive}
      />
    ),
  }
);

// ─── ActionBar ────────────────────────────────────────────────────────────────
figma.connect(
  ActionBar,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=ACTIONBAR_COMPONENT_NODE_ID",
  {
    props: {
      likes:    figma.string("Likes"),
      comments: figma.string("Comments"),
      shares:   figma.string("Shares"),
    },
    example: ({ likes, comments, shares }) => (
      <ActionBar likes={likes} comments={comments} shares={shares} />
    ),
  }
);

// ─── BottomNav ────────────────────────────────────────────────────────────────
figma.connect(
  BottomNav,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=BOTTOMNAV_COMPONENT_NODE_ID",
  {
    props: {
      showLabel: figma.boolean("ShowLabel"),
    },
    example: ({ showLabel }) => (
      <BottomNav
        showLabel={showLabel}
        items={[
          { key: "home",    label: "首页",   icon: null },
          { key: "friends", label: "朋友",   icon: null },
          { key: "create",  label: "",       icon: null },
          { key: "inbox",   label: "消息",   icon: null },
          { key: "me",      label: "我",     icon: null },
        ]}
      />
    ),
  }
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────
figma.connect(
  Skeleton,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=SKELETON_COMPONENT_NODE_ID",
  {
    props: {
      variant:  figma.enum("Variant", { Text: "text", Avatar: "avatar", Button: "button", Image: "image" }),
      animated: figma.boolean("Animated"),
    },
    example: ({ variant, animated }) => (
      <Skeleton variant={variant} animated={animated} />
    ),
  }
);

// ─── Modal ────────────────────────────────────────────────────────────────────
figma.connect(
  Modal,
  "https://www.figma.com/design/4clg3rdsyoyTbuZVVEMnUx?node-id=MODAL_COMPONENT_NODE_ID",
  {
    props: {
      size:     figma.enum("Size", { Small: "sm", Medium: "md", Large: "lg" }),
      closable: figma.boolean("Closable"),
      title:    figma.string("Title"),
    },
    example: ({ size, closable, title }) => (
      <Modal open={true} onClose={() => {}} size={size} closable={closable} title={title}>
        Content
      </Modal>
    ),
  }
);
