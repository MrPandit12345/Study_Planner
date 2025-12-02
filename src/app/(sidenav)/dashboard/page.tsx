import ProgressCard from "../../_component/ProgressCard";
import { HiOutlineViewGrid } from "react-icons/hi";
import Card from "../../_component/Card";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import Schedule from "../../_component/Schedule";

export default function PlannerPage() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-gray-800">
        Good Morning,Vishal 👋
      </h1>
    <p className="text-gray-500 mt-4 font-normal">
      {new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </p>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <ProgressCard
          completed={1}
          total={4}
          title="Today's Progress"
          subtitle="Sessions completed"
          icon={<HiOutlineViewGrid />}
          gradientFrom="#4D90F8"
          gradientTo="#2F80ED"
        />
        <Card
          title="Study Time"
          value={"5h 30m"}
          subtitle="Planned for today"
          icon={<AiOutlineClockCircle />}
          gradientFrom="#28C76F"
          gradientTo="#35D3A4"
        />
        <Card
          title="Weekly Streak"
          value={"12 days"}
          subtitle="Keep it up! 🔥"
          gradientFrom="#1098B8"
          gradientTo="#1491B4"
          icon={<BsGraphUpArrow />}
        />

        <div />
      </div>
        <Schedule />
    </div>
  );
}
