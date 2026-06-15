import Typography from "../../../ui/Typography";

const EmptyPanel = ({ label }) => (
  <div className="flex h-full flex-col items-center justify-center gap-1 px-6 text-center">
    <Typography as="p" variant="body-sm" className="font-medium">Nothing here yet</Typography>
    <Typography as="p" variant="caption">{label} for this meeting will show up here.</Typography>
  </div>
);

export default EmptyPanel;
