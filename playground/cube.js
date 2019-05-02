const legendaryAbilityLists = [
  { name: "공격력 : ", type: "waepon", value: 12, itemLevel: 100 },
  { name: "마력 : ", type: "waepon", value: 12, itemLevel: 100 },
  { name: "크리티컬 확률 : ", type: "waepon", value: 12, itemLevel: 100 },
  { name: "데미지 : ", type: "waepon", value: 12, itemLevel: 100 },
  {
    name: "캐릭터 기준 10레벨 당 공격력 : ",
    type: "waepon",
    value: 1,
    itemLevel: 100
  },
  {
    name: "캐릭터 기준 10레벨 당 마력 : ",
    type: "waepon",
    value: 1,
    itemLevel: 100
  },
  { name: "몬스터 방어율 무시 : ", type: "waepon", value: 35, itemLevel: 100 },
  { name: "몬스터 방어율 무시 : ", type: "waepon", value: 40, itemLevel: 100 },
  {
    name: "보스 몬스터 공격 시 데미지 : ",
    type: "waepon",
    value: 30,
    itemLevel: 100
  },
  {
    name: "보스 몬스터 공격 시 데미지 : ",
    type: "waepon",
    value: 35,
    itemLevel: 100
  },
  {
    name: "보스 몬스터 공격 시 데미지 : ",
    type: "waepon",
    value: 40,
    itemLevel: 100
  }
];

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const item1 = [];

function searchHiddenAbility(lgendaryAbilityLists) {
  let newAbilityList = [];
  let shuffledAbilityList = shuffle(legendaryAbilityLists);

  shuffledAbilityList.forEach(function(item){
    if (item.value > 10){
      return newAbilityList.push(item.name + "+" + item.value + "%")
    } else
    return newAbilityList.push(item.name + "+" + item.value)
  })

  return newAbilityList.slice(0,3)
}

console.log(searchHiddenAbility(legendaryAbilityLists));
