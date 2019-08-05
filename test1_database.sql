/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : localhost:3306
 Source Schema         : test1_database

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : 65001

 Date: 26/06/2019 16:11:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for profiles
-- ----------------------------
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型',
  `describe` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `income` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收入',
  `expend` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '花费',
  `cash` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '付款',
  `remark` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '说明',
  `createTime` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '购买时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of profiles
-- ----------------------------
INSERT INTO `profiles` VALUES (7, '优惠券2', 'omg2', 'omg2', 'omg2', 'omg2', 'omg2', '1561525786005');
INSERT INTO `profiles` VALUES (8, '优惠券3', 'omg3', 'omg3', 'omg3', 'omg3', 'omg3', '1561525847613');
INSERT INTO `profiles` VALUES (9, '优惠券4', 'omg4', 'omg4', 'omg4', 'omg4', 'omg4', '1561526678476');
INSERT INTO `profiles` VALUES (10, '优惠券1', 'omg5', 'omg5', 'omg5', 'omg5', 'omg5', '1561528429719');
INSERT INTO `profiles` VALUES (11, '优惠券1', 'omg6', 'omg6', 'omg6', 'omg6', 'omg6', '1561528439326');
INSERT INTO `profiles` VALUES (14, '优惠券1', 'wodet ', 'wodet ', 'wodet ', 'wodet ', 'wodet ', '1561533974439');
INSERT INTO `profiles` VALUES (15, '优惠券1', '111', '111', '111', '111', '111', '1561535244595');
INSERT INTO `profiles` VALUES (16, '优惠券1', '222', '222', '222', '222', '222', '1561535254295');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `jurisdiction` int(10) NOT NULL DEFAULT 0 COMMENT '权限 666：super管理员 0员工',
  `createDate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'xiaobai@163.com', 'woaiwo', NULL, '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48?s=200&r=pg&d=mm', 666, '1559039191603');
INSERT INTO `users` VALUES (3, 'xiaobai2', 'woaiwo', NULL, '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48?s=200&r=pg&d=mm', 0, 'Tue May 28 2019 23:10:21 GMT+0800 (GMT+08:00)');
INSERT INTO `users` VALUES (5, 'xiaobai520@163.com', 'woaiwo', '小白520', '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48?s=200&r=pg&d=mm', 0, 'Mon Jun 03 2019 10:02:20 GMT+0800 (GMT+08:00)');
INSERT INTO `users` VALUES (6, 'xiaobai520@qq.com', 'woaiwo', '小白520qq', '//www.gravatar.com/avatar/d415f0e30c471dfdd9bc4f827329ef48?s=200&r=pg&d=mm', 0, 'Mon Jun 03 2019 10:04:28 GMT+0800 (GMT+08:00)');

SET FOREIGN_KEY_CHECKS = 1;
