type DetailWatchProps = {
  params: {
    id: string;
  };
};

const DetailWatch = ({ params }: DetailWatchProps) => {
  console.log("🚀 ~ DetailWatch ~ params:", params);

  return <div className="flex-1">DetailWatch</div>;
};

export default DetailWatch;
