"use client";

import AsciiField from "@/components/charfield/ascii-field";
import { flowfield } from "@/components/charfield/fields/flowfield";
import { phasespace } from "@/components/charfield/fields/phasespace";
import { trappedion } from "@/components/charfield/fields/trappedion";
import { waves } from "@/components/charfield/fields/waves";

// client wrapper so server sections can pass a serializable name (not a fn)
const FIELDS = { flowfield, phasespace, trappedion, waves };

type Props = Omit<React.ComponentProps<typeof AsciiField>, "field"> & {
  name: keyof typeof FIELDS;
};

export default function AsciiBg({ name, ...props }: Props) {
  return <AsciiField field={FIELDS[name]} {...props} />;
}
