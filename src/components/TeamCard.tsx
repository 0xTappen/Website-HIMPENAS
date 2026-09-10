import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

interface TeamCardProps {
  imageUrl: string;
  name: string;
  role: string;
  period: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ imageUrl, name, role, period }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group w-full max-w-[320px]"
    >
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <div className="p-6 text-center md:p-8">
          <div className="relative mx-auto mb-6 h-36 w-36 md:h-40 md:w-40">
            <div className="absolute inset-0 rounded-full bg-emerald-100 blur-lg opacity-60" />
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md ring-1 ring-emerald-200">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(max-width: 768px) 144px, 160px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <motion.h3
            animate={{ color: isHovered ? "rgb(4, 120, 87)" : "rgb(31, 41, 55)" }}
            transition={{ duration: 0.2 }}
            className="break-words text-xl font-bold leading-tight text-gray-900 md:text-2xl"
          >
            {name}
          </motion.h3>

          <div className="mx-auto my-4 h-px w-16 bg-emerald-600" />

          <p className="rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 md:text-base">
            {role}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 border-t border-gray-100 pt-4 text-xs font-medium text-gray-600">
            <CalendarDays className="h-4 w-4 text-emerald-700" />
            <span>Periode {period}</span>
          </div>
        </div>
        <div className="h-1 bg-emerald-700" />
      </div>
    </motion.article>
  );
};

export default TeamCard;
