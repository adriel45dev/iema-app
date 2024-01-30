import { GradeType } from "../shared/type";

const TURMAS = [
  { name: "101", id: "101", title: "TÉCNICO EM ADMINISTRAÇÃO" },
  { name: "102", id: "102", title: "TÉCNICO EM ..." },
  { name: "103", id: "103", title: "TÉCNICO EM INFORMÁTICA" },
  { name: "104", id: "104", title: "TÉCNICO EM ..." },
  { name: "201", id: "201", title: "TÉCNICO EM ADMINISTRAÇÃO" },
  { name: "202", id: "202", title: "TÉCNICO EM SERVIÇOS JURÍDICOS" },
  { name: "203", id: "203", title: "TÉCNICO EM INFORMÁTICA" },
  { name: "204", id: "204", title: "TÉCNICO EM ENFERMAGEM" },
  { name: "301", id: "301", title: "TÉCNICO EM ADMINISTRAÇÃO" },
  { name: "302", id: "302", title: "TÉCNICO EM SERVIÇOS JURÍDICOS" },
  { name: "303", id: "303", title: "TÉCNICO EM INFORMÁTICA" },
  { name: "304", id: "304", title: "TÉCNICO EM ENFERMAGEM" },
];

const INSTITUCIONAL_ID = "0";

const DATA_DEF = {
  dataGrade: "data_grade",
  dataProfessores: "data_professores",
  dataDisciplinas: "data_disciplinas",
};

const GET_GRADE = () => {
  const dataJSON = localStorage.getItem(DATA_DEF.dataGrade);
  const data = dataJSON
    ? JSON.parse(dataJSON)
    : Array.from({ length: 5 }, () => Array.from({ length: 9 }, () => ({})));
  return data;
};

const SET_GRADE = (grade: GradeType[][]) => {
  const dataJSON = JSON.stringify(grade);
  localStorage.setItem(DATA_DEF.dataGrade, dataJSON);
};

const GRADE_SCHEDULE_HEADDING = [
  "07h35 - 08h25",
  "08h25 - 09h10",
  "09h30 - 10h20",
  "10h20 - 11h10",
  "11h10 - 12h00",
  "13h30 - 14h20",
  "14h20 - 15h05",
  "15h20 - 16h10",
  "16h10 - 17h00",
];

const GRADE_WEEK_HEADDING = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

const DATA_PROFESSOR = [{ id: "0", name: "INSTITUCIONAL" }];
const DATA_DISCIPLINAS = [
  { id: "i0", name: "TUTORIA", professores: DATA_PROFESSOR },
  { id: "i1", name: "ELETIVA", professores: DATA_PROFESSOR },
  { id: "i2", name: "TAM", professores: DATA_PROFESSOR },
  { id: "i3", name: "AVALIAÇÕES", professores: DATA_PROFESSOR },
  { id: "eo4", name: "EST. ORIENTADO", professores: [] },
];

const GET_DATE_STR = () => {
  const date = new Date();
  const dateStr = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}--${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  return dateStr;
};

export {
  TURMAS,
  INSTITUCIONAL_ID,
  DATA_DEF,
  GRADE_SCHEDULE_HEADDING,
  GRADE_WEEK_HEADDING,
  GET_GRADE,
  SET_GRADE,
  DATA_PROFESSOR,
  DATA_DISCIPLINAS,
  GET_DATE_STR,
};
