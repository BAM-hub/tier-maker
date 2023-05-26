import { ParentComponent } from "solid-js";
import style from "../style/Tier.module.css";
import { TierProps } from "../tier";

const Tier: ParentComponent<TierProps> = (props: TierProps) => {
  return (
    <div class={style.tierContainer}>
      <div class={style.tierTitle}>
        <h1>{props?.title}</h1>
      </div>
      <div class={style.tierContentContainer}>{props.children}</div>
    </div>
  );
};

export default Tier;
