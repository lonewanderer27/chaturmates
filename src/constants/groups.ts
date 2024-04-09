import { personCircleOutline } from "ionicons/icons"
import { klasmeyts } from "./klasmeyts"

export const NEW_GROUP = {
  step1: {
    name: "",
    description: "",
  },
  step2: {
    avatar_url: "",
    cover_url: "",
    vanity_id: ""
  },
  step3: {
    school: 1,
    college: 1,
    course: 2,
    semester: 2,
    academic_year_id: 1,
  },
}

export const GROUPS = {
  SOFTWARE_ENGINEERING_THE_BEST: {
    id: 1,
    icon: personCircleOutline,
    groupName: 'Software Engineering the Best',
    slug: "software_engineering_the_best",
    description: 'This is the best group ever',
    members: [
      klasmeyts.JOHNNA_DOE,
      klasmeyts.JANE_DOE,
      klasmeyts.JONATHAN_DOE,
    ]
  },
  GROUP_NI_JAY: {
    id: 2,
    icon: personCircleOutline,
    groupName: 'Group ni Jay',
    description: 'Confederation of Leading Adamsonian Web Scientists',
    members: [
      klasmeyts.JOHNNA_DOE,
      klasmeyts.JANE_DOE,
      klasmeyts.JONATHAN_DOE,
    ],
    slug: "group_ni_jay"
  },
  POTATO_CORNER: {
    id: 3,
    icon: personCircleOutline,
    groupName: 'Potato Corner',
    description: 'Tastiest and juiciest fries here!',
    members: [
      klasmeyts.JOHNNA_DOE,
      klasmeyts.JANE_DOE,
      klasmeyts.JONATHAN_DOE,
    ],
    slug: "potato_corner"
  },
  BURGER_KING: {
    id: 4,
    icon: personCircleOutline,
    groupName: 'Burger King',
    description: 'Have it your way!',
    members: [
      klasmeyts.JOHNNA_DOE,
      klasmeyts.JANE_DOE,
      klasmeyts.JONATHAN_DOE,
    ],
    slug: "burger_king"
  },
  JOLLIBEE: {
    id: 5,
    icon: personCircleOutline,
    groupName: 'Jollibee',
    description: 'Bida ang saya!',
    members: [
      klasmeyts.JOHNNA_DOE,
      klasmeyts.JANE_DOE,
      klasmeyts.JONATHAN_DOE,
    ],
    slug: "jollibee"
  },
}