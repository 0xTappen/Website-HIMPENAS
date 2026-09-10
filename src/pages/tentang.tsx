import type { GetServerSideProps, NextPage } from "next";
import { About, OrganizationDepartment, OrganizationMember, OrganizationSetting } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { organizationFallbackImage, organizationSlots } from "@/lib/organization";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import TeamCard from "@/components/TeamCard";
import DepartmentCard from "@/components/DepartmentCard";
import Link from "next/link";
import { motion } from "framer-motion";
import AlumniListCards from "@/components/AlumniListCards"; // <<< DITAMBAHKAN
import {
  Users,
  Target,
  Mail,
  Sparkles,
  ArrowRight,
  Building2,
  TrendingUp,
  Calendar,
  Shield,
} from "lucide-react";

interface TentangPageProps {
  about: About | null;
  members: OrganizationMember[];
  departments: OrganizationDepartment[];
  setting: OrganizationSetting | null;
}

const TentangPage: NextPage<TentangPageProps> = ({ about, members, departments, setting }) => {
  const headerRef = useRef<HTMLElement>(null);
  const [headerInView, setHeaderInView] = useState(false);
  const savedMembers = new Map(members.map((member) => [member.position, member]));
  const savedDepartments = new Map(departments.map((department) => [department.name, department]));
  const period = setting?.period || "2024/2025";
  const memberCount = setting?.memberCount ?? 500;
  const getMember = (position: string) => {
    const slot = organizationSlots.find((item) => item.position === position);
    const member = savedMembers.get(position);
    return {
      name: member?.name || slot?.defaultName || "Belum diisi",
      imageUrl: member?.imageUrl || organizationFallbackImage,
    };
  };
  const leadership = organizationSlots
    .filter((slot) => slot.section === "leadership")
    .map((slot) => ({ ...slot, ...getMember(slot.position) }));
  const executive = organizationSlots
    .filter((slot) => slot.section === "executive")
    .map((slot) => ({ ...slot, ...getMember(slot.position) }));
  const departmentCards = Array.from(
    new Set(organizationSlots.filter((slot) => slot.section === "department").map((slot) => slot.department))
  ).map((department) => {
    const slots = organizationSlots.filter((slot) => slot.department === department);
    return {
      title: department || "Departemen",
      staffCount: savedDepartments.get(department || "")?.staffCount ?? slots[0]?.staffCount ?? 0,
      ketua: getMember(slots.find((slot) => slot.role === "Ketua")!.position),
      wakil: getMember(slots.find((slot) => slot.role === "Wakil")!.position),
      sekretaris: getMember(slots.find((slot) => slot.role === "Sekretaris")!.position),
    };
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setHeaderInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Premium Header */}
      <header
        ref={headerRef}
        className="relative bg-gradient-to-br from-emerald-dark via-emerald-himp to-emerald-700 text-white pt-32 md:pt-40 pb-28 md:pb-36 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/header/event-header.jpeg"
            fill
            className="object-cover"
            alt="About Background"
            priority
          />
        </div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-dark/50 via-emerald-himp/50 to-emerald-700/50"></div>

        {/* Decorative Shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl"
        ></motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: headerInView ? 1 : 0,
                y: headerInView ? 0 : 20,
              }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-xl rounded-full mb-6 border border-white/30 shadow-lg"
            >
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span className="font-bold uppercase tracking-wider text-xs md:text-sm text-white">
                Profil Organisasi
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: headerInView ? 1 : 0,
                y: headerInView ? 0 : 30,
              }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
            >
              Tentang HIMPENAS
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: headerInView ? 1 : 0,
                y: headerInView ? 0 : 20,
              }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Mengenal lebih dekat struktur organisasi & tim pengurus HIMPENAS
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: headerInView ? 1 : 0,
                y: headerInView ? 0 : 20,
              }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 md:gap-6"
            >
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl md:text-4xl font-bold text-white">
                      {memberCount}+
                    </div>
                    <div className="text-sm text-white/80 font-medium">
                      Anggota Aktif
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none leading-none translate-y-4 md:translate-y-6">
          <svg
            className="w-full h-14 md:h-20"
            preserveAspectRatio="none"
            viewBox="0 0 1440 54"
            fill="none"
          >
            <path
              d="M0 22L60 26.7C120 31 240 41 360 39.2C480 37 600 23 720 17.8C840 13 960 17 1080 21.7C1200 26 1320 31 1380 33.3L1440 36V54H1380C1320 54 1200 54 1080 54C960 54 840 54 720 54C600 54 480 54 360 54C240 54 120 54 60 54H0V22Z"
              fill="rgb(249, 250, 251)"
            />
          </svg>
        </div>
      </header>

      <main className="flex-grow -mt-16 relative z-10">
        {/* Profil & Sejarah Section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative h-96 md:h-[500px] rounded-3xl shadow-2xl overflow-hidden group">
                  <Image
                    src="/about/about.jpeg"
                    alt="Kegiatan HIMPENAS"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-himp rounded-lg">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">
                          Sejak 2020
                        </div>
                        <div className="text-xs text-gray-600">
                          Terus Berkembang
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-100 rounded-3xl -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-emerald-50 rounded-3xl -z-10"></div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-emerald-himp" />
                  <span className="text-sm font-semibold text-emerald-dark uppercase tracking-wide">
                    Siapa Kami
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                  Profil & Sejarah
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-emerald-himp to-emerald-dark rounded-full mb-8"></div>

                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-emerald-himp prose-strong:font-bold prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html:
                      about?.profile ||
                      "<p class='text-gray-500 italic'>Informasi profil belum tersedia.</p>",
                  }}
                />

                {/* Mini Stats */}
                <div className="grid grid-cols-2 gap-4 mt-10">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-5 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-emerald-dark mb-1">
                      {departmentCards.length}
                    </div>
                    <div className="text-xs text-gray-700 font-medium uppercase tracking-wide">
                      Departemen
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-5 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-emerald-dark mb-1">
                      {departmentCards.reduce((total, department) => total + department.staffCount, 0)}+
                    </div>
                    <div className="text-xs text-gray-700 font-medium uppercase tracking-wide">
                      Pengurus
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Struktur Organisasi */}
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 md:mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6">
                <Users className="w-4 h-4 text-emerald-himp" />
                <span className="text-sm font-semibold text-emerald-dark uppercase tracking-wide">
                  Tim Kami
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Struktur Organisasi
              </h2>

              <div className="w-24 h-1 bg-gradient-to-r from-emerald-himp to-emerald-dark mx-auto rounded-full mb-6"></div>

              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Kenali tim pengurus yang berdedikasi untuk kemajuan HIMPENAS
              </p>
            </motion.div>

            <div className="flex flex-col items-center gap-12 md:gap-16">
              {/* Ketua & Wakil */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center w-full max-w-4xl"
              >
                <TeamCard
                  imageUrl={leadership[0].imageUrl}
                  name={leadership[0].name}
                  role={leadership[0].role}
                  period={period}
                />
                <TeamCard
                  imageUrl={leadership[1].imageUrl}
                  name={leadership[1].name}
                  role={leadership[1].role}
                  period={period}
                />
              </motion.div>

              {/* Sekum + Bendahara */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid w-full max-w-6xl grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4"
              >
                <TeamCard
                  imageUrl={executive[0].imageUrl}
                  name={executive[0].name}
                  role={executive[0].role}
                  period={period}
                />
                <TeamCard
                  imageUrl={executive[1].imageUrl}
                  name={executive[1].name}
                  role={executive[1].role}
                  period={period}
                />
                <TeamCard
                  imageUrl={executive[2].imageUrl}
                  name={executive[2].name}
                  role={executive[2].role}
                  period={period}
                />
                <TeamCard
                  imageUrl={executive[3].imageUrl}
                  name={executive[3].name}
                  role={executive[3].role}
                  period={period}
                />
              </motion.div>

              {/* Departemen */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full"
              >
                <div className="text-center mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Departemen
                  </h3>
                  <p className="text-gray-600">
                    5 Departemen dengan fokus berbeda untuk kemajuan organisasi
                  </p>
                </div>

                <div
                  className="
                    flex gap-6 overflow-x-auto snap-x snap-mandatory
                    sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
                    md:gap-8 hide-scrollbar
                  "
                >
                  {departmentCards.map((department) => (
                    <DepartmentCard key={department.title} {...department} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================ */}
        {/*      ALUMNI SECTION BARU     */}
        {/* ============================ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <AlumniListCards />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-dark to-emerald-himp text-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full mb-6 border border-white/30">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  Bergabung Bersama Kami
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
                Tertarik untuk Bergabung?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Jadilah bagian dari komunitas kami dan kembangkan skill-mu di
                HIMPENAS!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-3 bg-white text-emerald-himp px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <span>Hubungi Kami</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TentangPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const [about, members, departments, setting] = await Promise.all([
    prisma.about.findFirst(),
    prisma.organizationMember.findMany(),
    prisma.organizationDepartment.findMany(),
    prisma.organizationSetting.findUnique({ where: { id: 1 } }),
  ]);
  return {
    props: {
      about: JSON.parse(JSON.stringify(about)),
      members: JSON.parse(JSON.stringify(members)),
      departments: JSON.parse(JSON.stringify(departments)),
      setting: JSON.parse(JSON.stringify(setting)),
    },
  };
};
