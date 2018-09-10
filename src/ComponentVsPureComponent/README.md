# Pure Component vs Component

This illustrates the performance optimization `PureComponent` does compared to `Component`.

## Using _PureComponent_

With `PureComponent`, the map doesn't pan back to current location after the user drags to a different location. Since `PureComponent` diff check is shallow, it does not re-render since the value of state's `isUpdated` in [`index.tsx`](./index.tsx) is always `true` and does not change after every update through the `updateInterval` interval.

![Maps using PureComponent](img/pure_vs_component_pure.gif)

## Using _Component_

The `Component` diff check is not shallow, so it doesn't care about the fact that `isUpadted` does not change. Hence, it re-renders and sets the center back to when it was on update through the `updateInterval` interval.

![Maps using Component](img/pure_vs_component_component.gif)
